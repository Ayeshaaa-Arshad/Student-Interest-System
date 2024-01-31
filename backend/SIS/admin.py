from django.contrib import admin
from .models import Student, Department,Interest,ActivityLog

# Register your models here.
admin.site.register(Student)
admin.site.register(Department)
admin.site.register(Interest)
admin.site.register(ActivityLog)
