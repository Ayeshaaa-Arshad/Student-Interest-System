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

# class StudentSerializer(serializers.ModelSerializer):
#     # Assuming InterestSerializer is used here
#     interest = InterestSerializer()
#     dept_id = serializers.CharField(source='dept_id.deptName')
#
#     class Meta:
#         model = Student
#         fields = ['id', 'roll_number', 'name', 'city', 'degree', 'dob', 'interest', 'dept_id']
class StudentSerializer(serializers.ModelSerializer):
    # Assuming InterestSerializer is used here
    interest = InterestSerializer(read_only=False)
    dept_id = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all())


    class Meta:
        model = Student
        fields = ['id', 'roll_number', 'name', 'city', 'degree', 'dob', 'interest', 'dept_id']

    def create(self, validated_data):
        # Extract the 'interest' data from validated_data
        interest_data = validated_data.pop('interest', None)

        # Create the Student instance without the 'interest' field
        student_instance = Student.objects.create(**validated_data)

        # Create the Interest instance if 'interest' data is available
        if interest_data:
            interest_instance = Interest.objects.create(**interest_data)
            student_instance.interest = interest_instance
            student_instance.save()

        return student_instance



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

