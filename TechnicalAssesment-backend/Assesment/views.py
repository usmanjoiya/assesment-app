import logging

from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, DestroyAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from .models import Documents
from .serializers import DocumentSerializer, DocumentCreateSerializer

# Configure logging
logger = logging.getLogger(__name__)


class DocumentPagination(PageNumberPagination):
    page_size = 10  # Number of records per page
    max_page_size = 50  # Maximum allowed page size


def create_response(flag, message, data=None, status_code=200):
    response = {
        "success": flag,
        "message": message,
        "documents": data,
        "status": status_code,
    }
    if isinstance(data, (list, tuple)):
        response["total"] = len(data) if data else 0
    return Response(response, status=status_code)


# 1. List all documents
class DocumentListView(ListAPIView):
    queryset = Documents.objects.all().order_by('name')
    serializer_class = DocumentSerializer
    pagination_class = DocumentPagination

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)  # Apply pagination

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        logger.info("Documents listed successfully")
        return create_response(True, "Documents fetched successfully", serializer.data, 200)


# 2. Search documents
class DocumentSearchView(ListAPIView):
    queryset = Documents.objects.all()
    serializer_class = DocumentSerializer
    pagination_class = DocumentPagination

    def get_queryset(self):
        """
        Optionally filters documents by name using a 'name' query parameter.
        """
        queryset = super().get_queryset()
        name = self.request.query_params.get('name', None)
        if name:
            queryset = queryset.filter(name__icontains=name)
        return queryset

    def list(self, request, *args, **kwargs):
        # Fetch the filtered queryset
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)  # Apply pagination

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)

        # Log the search action
        search_term = self.request.query_params.get('name', '')
        logger.info(f"Search performed for documents with name containing: '{search_term}'")
        return create_response(True, "Documents fetched successfully", serializer.data, 200)


class DocumentRetrieveView(RetrieveAPIView):
    queryset = Documents.objects.all()
    serializer_class = DocumentSerializer

    def get_object(self):
        try:
            # Try to get the document object using the base class method
            return super().get_object()
        except Documents.DoesNotExist:
            logger.error("Document not found")
            return create_response(False, "Document not found", [], 404)

    def retrieve(self, request, *args, **kwargs):
        document = self.get_object()
        if document is None:
            return create_response(False, "Document not found", [], 404)

        # Serialize the retrieved document
        serializer = self.get_serializer(document)
        return create_response(True, "Document fetched successfully", serializer.data, 200)


# 4. Create a new document
class DocumentCreateView(CreateAPIView):
    serializer_class = DocumentCreateSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            document = serializer.save()
            # Get the uploaded file and calculate the size
            uploaded_file = document.file
            if uploaded_file:
                document.size = uploaded_file.size
                document.save()
            logger.info(f"Document created successfully: {document.name}")
            return create_response(True, "Document created successfully", DocumentSerializer(document).data, 201)
        logger.error(f"Document creation failed: {serializer.errors}")
        return create_response(False, "Validation error", serializer.errors, 400)


# 5. Delete a document
class DocumentDeleteView(DestroyAPIView):
    queryset = Documents.objects.all()
    serializer_class = DocumentSerializer

    def get_object(self):
        try:
            return super().get_object()
        except Documents.DoesNotExist:
            logger.error("Document not found")
            return None

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance:
            self.perform_destroy(instance)
            logger.info(f"Document deleted successfully: {instance.name}")
            return create_response(True, "Document deleted successfully", [], 200)
        else:
            return create_response(False, "No Documents match the given query.", [], 404)
