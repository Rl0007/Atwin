from django.contrib import admin

# Register your models here.

from .models import UserAccount , League, Match, Player
# from .models import Subject, StudyMaterial, ExamType, PreviousYearQuestion, ChapterwiseQuestion, Syllabus, Order
# admin.site.register(Exam)
admin.site.register(UserAccount)
admin.site.register(League)
admin.site.register(Match)
admin.site.register(Player)

# admin.site.register(Test)
# admin.site.register(Subject)
# admin.site.register(StudyMaterial)
# admin.site.register(ExamType)
# admin.site.register(PreviousYearQuestion)
# admin.site.register(ChapterwiseQuestion)
# admin.site.register(Syllabus)
# admin.site.register(Order)