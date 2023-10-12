from djoser.serializers import UserCreateSerializer
from rest_framework.serializers import ModelSerializer, Serializer, DateTimeField, SerializerMethodField
from django.contrib.auth import get_user_model
# from Atwin_backend.models import Exam, Subject, StudyMaterial, ExamType, PreviousYearQuestion, ChapterwiseQuestion, Syllabus, Order
from Atwin_backend.models import League,Player,Match
User = get_user_model()


class UserSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'name', 'password')

class LeagueSerializer(ModelSerializer):
    class Meta:
        model = League
        fields = '__all__'
class PlayerSerializer(ModelSerializer):
    class Meta:
        model = Player
        fields = '__all__'

class MatchfullSerializer(ModelSerializer):
    League = LeagueSerializer()
    Player_1 = PlayerSerializer()
    Player_2 = PlayerSerializer()
    class Meta:
        model = Match
        fields = '__all__'
class MatchSerializer(ModelSerializer):
 
    class Meta:
        model = Match
        fields = '__all__'
# class ExamSerializer(ModelSerializer):
#     class Meta:
#         model = Exam
#         fields = '__all__'


# # class TestSerializer(ModelSerializer):
# #     class Meta:
# #         model = Test
# #         fields = '__all__'


# class SubjectSerializer(ModelSerializer):
#     class Meta:
#         model = Subject
#         fields = "__all__"


# class StudyMaterialSerializer(ModelSerializer):
#     class Meta:
#         model = StudyMaterial
#         fields = "__all__"


# class BulkStudyMaterialSerializer(Serializer):
#     materials = StudyMaterialSerializer(many=True)


# class ExamTypeSerializer(ModelSerializer):
#     class Meta:
#         model = ExamType
#         fields = "__all__"


# class PreviousyearSerializer(ModelSerializer):
#     class Meta:
#         model = PreviousYearQuestion
#         fields = "__all__"


# class ChapterWiseSerializer(ModelSerializer):

#     class Meta:
#         model = ChapterwiseQuestion
#         fields = "__all__"


# class SyllabusSerializer(ModelSerializer):
#     exam_type_name = SerializerMethodField()

#     def get_exam_type_name(self, obj):
#         return obj.exam_type.name

#     class Meta:
#         model = Syllabus
#         fields = ['id', 'exam_type', 'exam_type_name',
#                   'heading', 'material_file']


# class OrderSerializer(ModelSerializer):
#     order_date = DateTimeField(format="%d %B %Y %I:%M %p")

#     class Meta:
#         model = Order
#         fields = '__all__'
#         # read_only_fields = ('order_date',)
#         # depth = 2
