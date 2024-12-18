# Generated by Django 5.1.3 on 2024-11-26 11:44

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Documents',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('content', models.TextField()),
                ('file', models.FileField(upload_to='documents')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('size', models.IntegerField(default=0)),
            ],
        ),
    ]
