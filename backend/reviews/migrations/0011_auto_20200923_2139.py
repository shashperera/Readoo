# Generated by Django 3.0.5 on 2020-09-23 16:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0010_auto_20200923_2129'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reviews',
            name='update_at',
            field=models.DateField(auto_now=True),
        ),
    ]