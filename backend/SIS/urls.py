"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# urls.py
from django.urls import path
from .views import (
    StudentListCreateAPIView,
    StudentDetailAPIView,
    DepartmentListCreateAPIView,
    DepartmentDetailAPIView, TopInterestsAPIView, BottomInterestsAPIView, DistinctInterestsAPIView, StudentListAPIView,
    ProvincialDistributionAPIView, submission_data, DepartmentDistributionAPIView, DegreeDistributionAPIView,
    GenderDistributionAPIView, LastThirtyDaysActivityAPIView, Last24HoursActivityAPIView, StudentStatusAPIView,
    MostActiveHoursAPIView, LeastActiveHoursAPIView, DeadHoursAPIView, interest_list, add_student, add_interest, signup,
    login_view,
)

urlpatterns = [
    #path('api/students/all/', StudentListCreateAPIView.as_view(), name='student-list-api'),
    path('api/students/all/', StudentListAPIView.as_view(), name='student-list-api'),
    path('api/students/<int:pk>/', StudentDetailAPIView.as_view(), name='student-detail-api'),
    path('api/departments/', DepartmentListCreateAPIView.as_view(), name='department-list-api'),
    path('api/departments/<int:pk>/', DepartmentDetailAPIView.as_view(), name='department-detail-api'),
    path('api/top_interests/', TopInterestsAPIView.as_view(), name='top-interests-api'),
    path('api/bottom_interests/', BottomInterestsAPIView.as_view(), name='bottom-interests-api'),
    path('api/distinct_interests/', DistinctInterestsAPIView.as_view(), name='distincts-api'),
    path('api/provincial_distribution/', ProvincialDistributionAPIView.as_view(), name='provincial-distribution-api'),
    path('api/submission_data/', submission_data, name='submission_data'),
    path('api/department_distribution/', DepartmentDistributionAPIView.as_view(), name='department_distribution_api'),
    path('api/degree_distribution/', DegreeDistributionAPIView.as_view(), name='degree_distribution_api'),
    path('api/gender_distribution/', GenderDistributionAPIView.as_view(), name='gender_distribution'),
    path('api/last_30_days_activity/', LastThirtyDaysActivityAPIView.as_view(), name='thirty_day_activity'),
    path('api/last_24_hours_activity/', Last24HoursActivityAPIView.as_view(), name='last_24_hours_activity'),
    path('api/student_status/', StudentStatusAPIView.as_view(), name='student_status'),
    path('api/active_hours/', MostActiveHoursAPIView.as_view(), name='active_hours'),
    path('api/least_active_hours/', LeastActiveHoursAPIView.as_view(), name='least_active_hours'),
    path('api/dead_hours/', DeadHoursAPIView.as_view(), name='dead_hours'),
    path('api/interests/', interest_list, name='interest_list'),
    path('api/add_student/', add_student, name='add_student'),
    path('api/add_interest/', add_interest, name='add_interest'),
    path('api/signup/', signup, name='signup'),
    path('api/login/', login_view, name='login'),
]
