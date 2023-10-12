from django.urls import path
from . import views
from .views import leagues_list, league_detail
from django.conf import settings
from django.conf.urls.static import static
# from django.conf.urls import url
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import MyTokenObtainPairView
urlpatterns = [

    path('', views.getRoutes),
    # path('getquestions/', views.getQuestions),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('leagues/',views.leagues_list),
     path('leagues/<int:pk>/', views.league_detail),
     path('players/',views.players_list),
     path('players/<int:pk>/', views.player_detail),
     path('matches/',views.matches_list),
     path('matches/<int:pk>/', views.match_detail),
     path('addpoint/',views.add_point),
     path('substractpoint/',views.substract_point),
     path('search_matches/<str:query>/', views.search_matches),


    # path('createsyllabus/', views.syllabus_create),
    # path('fetchsyllabus/', views.fetch_syllabus),
    # path('altersyllabus/<int:id>',views.alter_syllabus),
    # path("syllabusdetail/<int:id>", views.syllabus_detail),

    # path('createchapterwise/', views.create_chapterwise),
    # path('fetchchapterwise/', views.fetch_chapterwise),
    # path('fetchchapterwisedetail/<str:id>', views.fetch_chapterwise_detail),
    # path('alterchapterwisedetail/<str:id>', views.alter_chapterwise_detail),


    # path('createpreviousyear/', views.create_previousyear),
    # path('fetchpreviousyear/', views.fetch_previousyear),
    # path('alterpreviousyear/<int:id>',views.alter_previousyear),



    # path('createstudymaterial/', views.study_material_create),
    # path('fetchstudymaterial/', views.fetch_study_material),
    # path('alterstudymaterial/<int:id>', views.alter_study_material),



    # path('pay/', views.start_payment),
    # path("payment/success/", views.handle_payment_success),
    # path("purchasedexams/", views.purchased_exams),



    # path('fetchexamquestions/<str:exam_id>', views.fetch_exam_questions),
    # path('createexam/', views.exam_create),
    # path('fetchallexam/', views.fetch_allexam),
    # path('alterexamdetail/<str:id>', views.exam_detail),
    # path('showexamoftype/<int:id>', views.exams_associated_with_examtype),

    # path('createsubject/', views.subject_create),
    # path('subjectdetail/<int:id>', views.subject_detail),
    # path('studymaterialdetail/<int:exam_id>', views.study_material_detail),
    # path("previousyeardetail/<int:id>", views.previousyear_detail),
    # path('chapterwisesubjects/<int:exam_id>', views.chapterwise_subjects),
  
    # path("validateorder/", views.order_validate),
    # path("getfile/media/<str:directory>/<str:filename>", views.Downloadfile)






]

