# -*- coding: utf-8 -*-
import logging
import os
from mock import Mock, patch
from django.conf import settings
from django.test import TransactionTestCase
from string import Template
from ..wfs import WFSToGPKG

logger = logging.getLogger(__name__)


class TestWFSToGPKG(TransactionTestCase):
    def setUp(self, ):
        self.path = settings.ABS_PATH()

    @patch('eventkit_cloud.tasks.models.ExportTask')
    @patch('eventkit_cloud.utils.wfs.os.path.exists')
    @patch('eventkit_cloud.utils.wfs.subprocess.PIPE')
    @patch('eventkit_cloud.utils.wfs.subprocess.Popen')
    def test_create_convert(self, popen, pipe, exists, export_task):
        gpkg = '/path/to/sqlite.gpkg'
        bbox = [-45, -45, 45, 45]
        layer = 'awesomeLayer'
        name = 'Great export'
        service_url = 'http://my-service.org/some-server/wms?'
        expected_url = '{}{}'.format(service_url.rstrip('?'), '?SERVICE=WFS&VERSION=1.0.0&REQUEST=GetFeature&TYPENAME={}&SRSNAME=EPSG:4326'.format(layer))
        cmd = Template("ogr2ogr -skipfailures -t_srs EPSG:3857 -spat $minX $minY $maxX $maxY -f GPKG $gpkg WFS:'$url'")
        cmd = cmd.safe_substitute({'gpkg': gpkg, 'url': expected_url, 'minX': bbox[0], 'minY': bbox[1], 'maxX': bbox[2], 'maxY': bbox[3]})
        exists.return_value = True
        proc = Mock()
        popen.return_value = proc
        proc.communicate.return_value = (Mock(), Mock())
        proc.wait.return_value = 0
        w2g = WFSToGPKG(gpkg=gpkg,
                          bbox=bbox,
                          service_url=service_url,
                          layer=layer,
                          debug=False,
                          name=name,
                          service_type=None)
        out = w2g.convert()
        export_task.assert_called_once()
        exists.assert_called_once_with(os.path.dirname(gpkg))
        popen.assert_called_once_with(cmd, shell=True, executable='/bin/sh',
                                stdout=pipe, stderr=pipe)
        proc.communicate.assert_called_once()
        proc.wait.assert_called_once()
        self.assertEquals(out, gpkg)


