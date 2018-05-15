# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2018-04-12 22:28
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0024_auto_20180313_2039'),
    ]

    operations = [
        migrations.AddField(
            model_name='dataprovider',
            name='max_selection',
            field=models.DecimalField(decimal_places=3, default=250, help_text='This is the maximum area in square kilometers that can be exported from this provider in a single DataPack.', max_digits=12, verbose_name='Max selection area'),
        ),
        migrations.AlterField(
            model_name='dataprovider',
            name='level_from',
            field=models.IntegerField(blank=True, default=0, help_text='This determines the starting zoom level the tile export will seed from.', null=True, verbose_name='Seed from level'),
        ),
        migrations.AlterField(
            model_name='dataprovider',
            name='level_to',
            field=models.IntegerField(blank=True, default=10, help_text='This determines the highest zoom level the tile export will seed to.', null=True, verbose_name='Seed to level'),
        ),
    ]
