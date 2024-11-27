interface Document {
  id: string;
  name: string;
  content: string;
  created_at?: string;
  size?: number;
  file?: string;
}

interface FormattedDocument {
  id: string;
  name: string;
  content: string;
  createdDate: string;
  fileSize: string;
  fileUrl: string;
}

export const formatDocument = (doc: Document): FormattedDocument => {
  if (!doc) {
    alert('Document object is required');
    return {
      id: '',
      name: 'Unknown Document',
      content: '',
      createdDate: 'N/A',
      fileSize: '0 KB',
      fileUrl: '',
    };
  }

  return {
    id: doc.id || '',
    name: doc.name || 'Unknown Document',
    content: doc.content || '',
    createdDate: doc.created_at
      ? new Date(doc.created_at).toLocaleDateString()
      : 'N/A',
    fileSize: doc.size ? `${(doc.size / 1024).toFixed(2)} KB` : '0 KB',
    fileUrl: doc.file || '',
  };
};
