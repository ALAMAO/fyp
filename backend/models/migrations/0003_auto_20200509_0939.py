# Generated by Django 3.0.6 on 2020-05-09 09:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('models', '0002_auto_20200509_0729'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='box',
            name='coordinates',
        ),
        migrations.AddField(
            model_name='box',
            name='height',
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name='box',
            name='top_left_x_coordinate',
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name='box',
            name='top_left_y_coordinate',
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name='box',
            name='width',
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name='image',
            name='height',
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name='image',
            name='width',
            field=models.FloatField(default=0),
        ),
    ]
