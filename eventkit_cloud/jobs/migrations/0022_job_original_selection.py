# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-11-09 13:17
from __future__ import unicode_literals

import django.contrib.gis.db.models.fields
import django.contrib.gis.geos.collections
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0021_auto_20170825_1416'),
    ]

    operations = [
        migrations.AddField(
            model_name='job',
            name='original_selection',
            field=django.contrib.gis.db.models.fields.GeometryCollectionField(blank=True, default=django.contrib.gis.geos.collections.GeometryCollection(), null=True, srid=4326, verbose_name='The original map selection'),
        ),
    ]
