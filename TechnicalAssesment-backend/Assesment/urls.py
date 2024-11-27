from django.urls import path

from . import views

urlpatterns = [
    path('documents/', views.DocumentListView.as_view(), name='document-list'),
    path('documents/search/', views.DocumentSearchView.as_view(), name='document-search'),
    path('documents/create/', views.DocumentCreateView.as_view(), name='document-create'),
    path('documents/<int:pk>/', views.DocumentRetrieveView.as_view(), name='document-retrieve'),
    path('documents/<int:pk>/delete/', views.DocumentDeleteView.as_view(), name='document-delete'),
]
