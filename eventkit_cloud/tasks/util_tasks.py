from celery import Task
from celery.app import app_or_default

from eventkit_cloud.tasks.models import ExportTask, ExportProviderTask


class RevokeTask(Task):
    def run(self, task_uid):
        pt = ExportProviderTask.objects.filter(uid=task_uid).first()
        export_tasks = pt.tasks.all()
        app = app_or_default()

        for et in export_tasks:
            app.control.revoke(
                str(et.celery_uid),
                terminate=True,
                signal='SIGKILL'
            )

            et.status = 'CANCELLED'
            et.save()

        pt.status = 'CANCELLED'
        pt.save()
