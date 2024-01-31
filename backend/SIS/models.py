# models.py
from django.contrib.auth.models import User
from django.db import models

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # Add any additional fields you need for the user profile

    def __str__(self):
        return self.user.username

class Department(models.Model):
    deptName = models.CharField(max_length=255)

    def __str__(self):
        return self.deptName

class Interest(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Student(models.Model):
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
    ]
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES,default='female')
    roll_number = models.CharField(max_length=20, unique=True)
    email = models.EmailField(null=True, blank=True)
    name = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    degree = models.CharField(max_length=255)
    dob = models.DateField()
    interest = models.ForeignKey(Interest, on_delete=models.CASCADE, null=True)
    dept_id = models.ForeignKey(Department, on_delete=models.CASCADE)
    graduation_date = models.DateField(null=True, blank=True)
    enrollment_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.name

class ActivityLog(models.Model):
    ACTIVITY_CHOICES = (
        ('login', 'Login'),
        ('logout', 'Logout'),
        ('screen_change', 'Screen Change'),
        ('page_size_change', 'Page Size Change'),
        ('navigation_button_click', 'Navigation Button Click'),
        ('record_operation', 'Record Operation'),
    )

    student = models.ForeignKey(Student, on_delete=models.CASCADE, null=True, blank=True)
    activity_type = models.CharField(max_length=50, choices=ACTIVITY_CHOICES)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.name} - {self.activity_type} at {self.timestamp}"