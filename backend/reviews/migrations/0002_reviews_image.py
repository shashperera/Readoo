# Generated by Django 3.0.5 on 2020-09-17 10:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='reviews',
            name='image',
            field=models.ImageField(blank=True, default='', upload_to='reviews/'),
        ),
    ]
