from django.contrib import admin

from .models import Documents


# Register your models here.
@admin.register(Documents)
class DocumentsAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'content', 'file', 'created_at', 'size')
