# views.py
from django.contrib.auth import authenticate, login
from django.utils import timezone
from rest_framework import status
from rest_framework import generics
from collections import Counter
from django.db.models import F, Count
from datetime import timedelta, datetime, date
from django.db.models.functions import TruncHour, ExtractHour
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Student, Department, Interest, ActivityLog
from .Serializers import TopInterestsSerializer, StudentSerializer, DepartmentSerializer, InterestSerializer, \
    BottomInterestsSerializer, ProvincialDistributionSerializer, ActivityLogSerializer, \
    DepartmentDistributionSerializer, GenderDistributionSerializer, UserSerializer



class TopInterestsAPIView(APIView):
    def get(self, request, format=None):
        # Get all interests from students
        all_interests = Student.objects.values_list('interest__name', flat=True)

        # Use Counter to count the occurrences of each interest
        interest_counter = Counter(all_interests)

        # Get the top interests (you may adjust the count as needed)
        top_interests = interest_counter.most_common(5)  # Change 5 to the desired number

        # Convert the list of tuples to a list of dictionaries
        top_interests_data = [{'interest': {'name': interest}, 'count': count} for interest, count in top_interests]

        # Serialize the data
        serializer = TopInterestsSerializer(top_interests_data, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

class StudentListCreateAPIView(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class StudentDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class DepartmentListCreateAPIView(generics.ListCreateAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

class DepartmentDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

class BottomInterestsAPIView(APIView):
    def get(self, request, format=None):
        # Get all interests from students
        all_interests = Interest.objects.values_list('name', flat=True)

        # Use Counter to count the occurrences of each interest
        interest_counter = Counter(all_interests)

        # Get the bottom interests (you may adjust the count as needed)
        bottom_interests = [{'interest': {'name': name}, 'count': count} for name, count in interest_counter.most_common()[:-6:-1]]

        # Serialize the data
        serializer = BottomInterestsSerializer(bottom_interests, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
class DistinctInterestsAPIView(APIView):
    def get(self, request, format=None):
        # Get distinct interests from the Interest model
        distinct_interests = Interest.objects.values('name').distinct()

        # Serialize the data
        serializer = InterestSerializer(distinct_interests, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


# class StudentListAPIView(APIView):
#     def get(self, request, format=None):
#         # Get query parameters for pagination and sorting
#         page = int(self.request.query_params.get('_page', 1))
#         limit = int(self.request.query_params.get('_limit', 10))
#         sort_column = self.request.query_params.get('_sort', 'id')
#         sort_order = self.request.query_params.get('_order', 'asc')
#
#         # Validate sort order
#         if sort_order.lower() not in ['asc', 'desc']:
#             return Response({'error': 'Invalid sort order'}, status=status.HTTP_400_BAD_REQUEST)
#
#         # Handle sorting for related fields
#         related_fields = {'interest': 'interest__name', 'dept_id': 'dept_id__deptName'}
#         sort_column = related_fields.get(sort_column, sort_column)
#
#         # Use F expression for sorting to avoid issues with related fields
#         sort_field = F(sort_column) if sort_order == 'asc' else F(sort_column).desc()
#
#         students = Student.objects.all().order_by(sort_field)
#
#         # Paginate the results
#         start_index = (page - 1) * limit
#         end_index = start_index + limit
#         students = students[start_index:end_index]
#
#         serializer = StudentSerializer(students, many=True)
#
#         return Response(serializer.data, status=status.HTTP_200_OK)

class StudentListAPIView(APIView):
    def get(self, request, format=None):
        # Get query parameters for pagination and sorting
        page = int(self.request.query_params.get('_page', 1))
        limit = int(self.request.query_params.get('_limit', 10))
        sort_column = self.request.query_params.get('_sort', 'id')
        sort_order = self.request.query_params.get('_order', 'asc')

        # Validate sort order
        if sort_order.lower() not in ['asc', 'desc']:
            return Response({'error': 'Invalid sort order'}, status=status.HTTP_400_BAD_REQUEST)

        # Handle sorting for related fields
        related_fields = {'interest': 'interest__name', 'dept_id': 'dept_id__deptName'}
        sort_column = related_fields.get(sort_column, sort_column)

        # Using F expression for sorting to avoid issues with related fields
        sort_field = F(sort_column) if sort_order == 'asc' else F(sort_column).desc()

        # Retrieve all students without applying pagination
        all_students = Student.objects.all().order_by(sort_field)

        # Get the total count of students
        total_students = all_students.count()

        # Paginate the results
        start_index = (page - 1) * limit
        end_index = start_index + limit
        students = all_students[start_index:end_index]

        serializer = StudentSerializer(students, many=True)

        # Include total count in the response
        response_data = {
            'total_count': total_students,
            'students': serializer.data,
        }

        return Response(response_data, status=status.HTTP_200_OK)
class ProvincialDistributionAPIView(APIView):
    def get(self, request, format=None):
        # Query to get provincial distribution
        provincial_distribution = Student.objects.values('city').annotate(count=Count('city'))

        # Serialize the data using the new serializer
        serializer = ProvincialDistributionSerializer(provincial_distribution, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def submission_data(request):
    try:
        # Filter activity logs for submission-related activities (modify as needed)
        submission_logs = ActivityLog.objects.filter(activity_type__in=['login', 'logout', 'record_operation'])

        # Serialize the data
        serializer = ActivityLogSerializer(submission_logs, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class DepartmentDistributionAPIView(APIView):
    def get(self, request, format=None):
        # Query to get department distribution
        department_distribution = Department.objects.values('deptName').annotate(count=Count('student'))

        # Serialize the data using the serializer
        serializer = DepartmentDistributionSerializer(department_distribution, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

class DegreeDistributionAPIView(APIView):
    def get(self, request, format=None):
        # Query to get degree distribution
        degree_distribution = Student.objects.values('degree').annotate(count=Count('degree'))

        # Serialize the data using your serializer (create one if needed)
        serializer_data = [{'degree': entry['degree'], 'count': entry['count']} for entry in degree_distribution]

        return Response(serializer_data, status=status.HTTP_200_OK)

class GenderDistributionAPIView(APIView):
    def get(self, request, format=None):
        # Query to get gender distribution
        gender_distribution = Student.objects.values('gender').annotate(count=Count('gender'))

        # Serialize the data using the serializer
        serializer = GenderDistributionSerializer(gender_distribution, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

class LastThirtyDaysActivityAPIView(APIView):
    def get(self, request, format=None):
        # Calculate the date thirty days ago from today
        thirty_days_ago = datetime.now() - timedelta(days=30)

        # Filter activity logs within the last thirty days
        last_thirty_days_activity = ActivityLog.objects.filter(timestamp__gte=thirty_days_ago)

        # Group by activity type and count occurrences
        activity_counts = last_thirty_days_activity.values('activity_type').annotate(count=Count('activity_type'))

        # Serialize the data
        data = [
            {
                'activity_type': entry['activity_type'],
                'count': entry['count'],
            }
            for entry in activity_counts
        ]

        return Response(data, status=status.HTTP_200_OK)

class Last24HoursActivityAPIView(APIView):
    def get(self, request, format=None):
        try:
            # Calculate the start time for the last 24 hours
            start_time = timezone.now() - timedelta(days=1)

            # Query the database for activity logs within the last 24 hours
            activity_logs = ActivityLog.objects.filter(timestamp__gte=start_time)

            # Group the data by hour intervals and count the number of actions
            interval_count = activity_logs.annotate(
                hour=TruncHour('timestamp')
            ).values('hour').annotate(count=Count('id'))

            # Serialize the data
            data = [
                {
                    'timestamp': entry['hour'],
                    'count': entry['count'],
                }
                for entry in interval_count
            ]

            return Response(data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class StudentStatusAPIView(APIView):
    def get(self, request, format=None):
        try:
            # Get the current date
            today = date.today()

            # Calculate the number of students currently studying
            studying_count = Student.objects.all().count()

            # Calculate the number of students recently enrolled (enrolled within the last year)
            recently_enrolled_count = Student.objects.filter(enrollment_date__year=today.year).count()

            # Calculate the number of students about to graduate (graduating within the next year)
            about_to_graduate_count = Student.objects.filter(
                graduation_date__year=today.year,
                graduation_date__gte=today
            ).count()

            # Calculate the number of students graduated (graduated before the current date)
            graduated_count = Student.objects.filter(graduation_date__lt=today).count()

            # Prepare the response data
            data = {
                'studying_count': studying_count,
                'recently_enrolled_count': recently_enrolled_count,
                'about_to_graduate_count': about_to_graduate_count,
                'graduated_count': graduated_count,
            }

            return Response(data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class MostActiveHoursAPIView(APIView):
    def get(self, request, format=None):
        # Calculate the date 30 days ago from today
        thirty_days_ago = timezone.now() - timedelta(days=30)

        # Filter activity logs within the last 30 days
        last_thirty_days_activity = ActivityLog.objects.filter(timestamp__gte=thirty_days_ago)

        # Group by the hour and count occurrences
        activity_counts = last_thirty_days_activity.annotate(hour=ExtractHour('timestamp')).values('hour').annotate(count=Count('hour'))

        # Order by count in descending order
        sorted_activity_counts = activity_counts.order_by('-count')[:10]  # Change 10 to the desired number of hours

        # Serialize the data
        data = [
            {
                'hour': entry['hour'],
                'formatted_time': (timezone.datetime(2023, 1, 1, entry['hour']) + timedelta(hours=12)).strftime('%I:%M %p'),  # Format the time as 10:00 AM
                'count': entry['count'],
            }
            for entry in sorted_activity_counts
        ]

        return Response(data, status=status.HTTP_200_OK)

class LeastActiveHoursAPIView(APIView):
    def get(self, request, format=None):
        # Calculate the start time for the last 30 days
        thirty_days_ago = timezone.now() - timezone.timedelta(days=30)

        # Filter activity logs within the last 30 days
        last_thirty_days_activity = ActivityLog.objects.filter(timestamp__gte=thirty_days_ago)

        # Group by hour and count occurrences
        hour_counts = last_thirty_days_activity.annotate(hour=ExtractHour('timestamp')).values('hour').annotate(count=Count('id'))

        # Order by count in ascending order to get least active hours first
        least_active_hours = hour_counts.order_by('count')[:5]  # Change 5 to the desired number of hours

        # Serialize the data
        data = []
        for entry in least_active_hours:
            hour = entry['hour']
            formatted_time = self.format_hour(hour)
            count = entry['count']
            data.append({'hour': hour, 'formatted_time': formatted_time, 'count': count})

        return Response(data)

    def format_hour(self, hour):
        # Check if the timestamp is naive before applying timezone.localtime
        timestamp = timezone.datetime(2000, 1, 1, hour)
        if timezone.is_naive(timestamp):
            timestamp = timezone.make_aware(timestamp, timezone.get_default_timezone())

        return timezone.localtime(timestamp).strftime('%I:%M %p')

class DeadHoursAPIView(APIView):
    def get(self, request, format=None):
        # Calculate the start time for the last 30 days
        thirty_days_ago = timezone.now() - timezone.timedelta(days=30)

        # Filter activity logs within the last 30 days
        last_thirty_days_activity = ActivityLog.objects.filter(timestamp__gte=thirty_days_ago)

        # Group by hour and count occurrences
        hour_counts = last_thirty_days_activity.annotate(hour=ExtractHour('timestamp')).values('hour').annotate(count=Count('id'))

        # Order by count in ascending order to get dead hours first
        dead_hours = hour_counts.order_by('count')[:5]  # Change 5 to the desired number of hours

        # Serialize the data
        data = []
        for entry in dead_hours:
            hour = entry['hour']
            formatted_time = self.format_hour(hour)
            count = entry['count']
            data.append({'hour': hour, 'formatted_time': formatted_time, 'count': count})

        return Response(data)

    def format_hour(self, hour):
        # Check if the timestamp is naive before applying timezone.localtime
        timestamp = timezone.datetime(2000, 1, 1, hour)
        if timezone.is_naive(timestamp):
            timestamp = timezone.make_aware(timestamp, timezone.get_default_timezone())

        return timezone.localtime(timestamp).strftime('%I:%M %p')

@api_view(['GET'])
def interest_list(request):
    try:
        interests = Interest.objects.all()
        serializer = InterestSerializer(interests, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# @api_view(['POST'])
# def add_student(request):
#     if request.method == 'POST':
#         serializer = StudentSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['POST'])
def add_student(request):
    if request.method == 'POST':
        serializer = StudentSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def add_interest(request):
    try:
        serializer = InterestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        login(request, user)
        return Response({'message': 'Signup successful'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user:
        login(request, user)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
