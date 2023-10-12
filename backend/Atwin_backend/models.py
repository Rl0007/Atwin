from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
class UserAccountManager(BaseUserManager):

    def create_user(self, email,name,password=None ):
     
        if not email:
            raise ValueError("You must use a valid email address")

        email = self.normalize_email(email)
        user = self.model(email=email, name=name)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, name,is_staff,is_superuser, password):
        user = self.create_user(email, name, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name','is_staff', 'is_superuser']

    objects = UserAccountManager()
 
    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name

    def __str__(self):
        return self.email



class Subject(models.Model):
    name = models.CharField(max_length=40)


class League(models.Model):
    name = models.CharField(max_length=40)

class Player(models.Model):
    name = models.CharField(max_length=40)
    country = models.CharField(max_length=2)

class Match(models.Model):
    name = models.CharField(max_length=40)
    League = models.ForeignKey(League, on_delete=models.CASCADE)
    Player_1 = models.ForeignKey(Player,on_delete=models.CASCADE, related_name="Player_1")
    Player_2 = models.ForeignKey(Player,on_delete=models.CASCADE,related_name="Player_2")
    Winner = models.CharField(max_length=1, null=True)
    Status = models.CharField(max_length=10)
    Score = models.JSONField()
    Serve= models.CharField(max_length=10)
    Comments = models.JSONField(null=True)

   
class ExamType(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)