# Generated by Django 3.0.5 on 2020-09-17 10:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0002_reviews_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reviews',
            name='image',
            field=models.ImageField(default='', upload_to='reviews/'),
        ),
    ]
