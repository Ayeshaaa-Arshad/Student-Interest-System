# serializers.py
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Student, Department, Interest, ActivityLog, UserProfile


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'deptName']

class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        fields = ['id', 'name']

class StudentSerializer(serializers.ModelSerializer):
    # Assuming InterestSerializer is used here
    interest = InterestSerializer()
    dept_id = serializers.CharField(source='dept_id.deptName')

    class Meta:
        model = Student
        fields = ['id', 'roll_number', 'name', 'city', 'degree', 'dob', 'interest', 'dept_id']

class TopInterestsSerializer(serializers.Serializer):
    # Assuming InterestSerializer is used here
    interest = InterestSerializer()
    count = serializers.IntegerField()
class BottomInterestsSerializer(serializers.Serializer):
    # Assuming InterestSerializer is used here
    interest = InterestSerializer()
    count = serializers.IntegerField()

class ProvincialDistributionSerializer(serializers.Serializer):
    city = serializers.CharField()
    count = serializers.IntegerField()
class ActivityLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityLog
        fields = ['id', 'student', 'activity_type', 'timestamp']


class DepartmentDistributionSerializer(serializers.Serializer):
    deptName = serializers.CharField()
    count = serializers.IntegerField()

class GenderDistributionSerializer(serializers.Serializer):
    gender = serializers.CharField()
    count = serializers.IntegerField()

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'profile']
        extra_kwargs = {'password': {'write_only': True}}