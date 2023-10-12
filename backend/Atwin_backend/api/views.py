from django.http import JsonResponse
from django.core.files import File
from django.http import HttpResponse
from rest_framework.decorators import api_view

from django.conf import settings
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserSerializer,LeagueSerializer,MatchSerializer,MatchfullSerializer,PlayerSerializer
from django.db import models
from django.shortcuts import render
from ..models import UserAccount,League,Match,Player

from rest_framework.parsers import MultiPartParser
import os
from rest_framework import status

import json



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        print(user)
        token = super().get_token(user)

        # Add custom claims
        token['name'] = user.name
        token['email'] = user.email
        token['is_superuser'] = user.is_superuser

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    # print("hello")
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        "/api/token",
        "/api/token/refresh",
        "/rahul"
    ]
    return Response(routes)


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])

def leagues_list(request):
    if request.method == 'GET':
        leagues = League.objects.all()
        serializer = LeagueSerializer(leagues, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = LeagueSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])

def league_detail(request, pk):
    try:
        league = League.objects.get(pk=pk)
    except League.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = LeagueSerializer(league)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = LeagueSerializer(league, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        league.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



@api_view(['GET', 'POST'])

def players_list(request):
    if request.method == 'GET':
        leagues = Player.objects.all()
        serializer = PlayerSerializer(leagues, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PlayerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])

def player_detail(request, pk):
    try:
        league = Player.objects.get(pk=pk)
    except Player.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PlayerSerializer(league)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = PlayerSerializer(league, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        league.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)




@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def matches_list(request):
    if request.method == 'GET':
        matches = Match.objects.all()
        serialized_matches = MatchfullSerializer(matches, many=True).data

        # Group matches by league
        grouped_matches = {}
        for match_data in serialized_matches:
            league_id = match_data['League']['name']
            if league_id not in grouped_matches:
                grouped_matches[league_id] = {'league_name': match_data['League']['name'], 'matches': []}
            grouped_matches[league_id]['matches'].append(match_data)

        return Response(grouped_matches)

    elif request.method == 'POST':
        serializer = MatchSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([AllowAny])

def match_detail(request, pk):
    try:
        league = Match.objects.get(pk=pk)
    except Match.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = MatchfullSerializer(league)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = MatchSerializer(league, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        league.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_point(request):
    match_id = request.data.get('id')
    player = request.data.get('player')
    player2 = "Player_2" if player=="Player_1" else "Player_1"
    
    try:
        match = Match.objects.get(pk=match_id)
    except Match.DoesNotExist:
        return Response({"error": "Match not found"}, status=status.HTTP_404_NOT_FOUND)

    partialserializer = MatchfullSerializer(match).data
    name = partialserializer[player]["name"]
    print(partialserializer[player])
    match.Score[player][-1] += 1  # Increase the last score by 1
    match.Comments["Comments"].append(f"Score by {name}")
    if (match.Score[player][-1] >= 11 and (
        abs(match.Score[player][-1] - match.Score[player2][-1]) >= 2
    )or(match.Score[player][-1]>=11 and match.Score[player2][-1]>=9 and 
        abs(match.Score[player][-1] - match.Score[player2][-1]) >= 2) ):
        print("inside set increase")
        match.Comments["Comments"].append(f"Set won by {name}")

        match.Status= f"Set {len(match.Score[player])}"
        match.Score[player][0] += 1
        match.Score[player].extend([0])
        match.Score[player2].extend([0]) 
        
        match.Score[player] = match.Score[player]

   
        if match.Score[player][0] >= 3:
            match.Winner = "1" if player == "Player_1" else "2"
            match.Status = "Finished"
            match.Comments["Comments"].append(f"Game won by {name}")



    if (match.Score[player][-1] +match.Score[player2][-1]) % 2 == 0:
        match.Serve = "Player_2" if match.Serve=="Player_1" else "Player_1"
    serializer = MatchSerializer(match, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def substract_point(request):


    match_id = request.data.get('id')
    player = request.data.get('player')
    player2 = "Player_2" if player=="Player_1" else "Player_1"

    try:
        match = Match.objects.get(pk=match_id)
    except Match.DoesNotExist:
        return Response({"error": "Match not found"}, status=status.HTTP_404_NOT_FOUND)

    match.Score[player][-1] -= 1 

    serializer = MatchSerializer(match, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


@api_view(['GET'])
@permission_classes([AllowAny])
def search_matches(request,query):
    
    
    # Search matches by match name or player names
    matches = Match.objects.filter(
        models.Q(name__icontains=query) |
        models.Q(Player_1__name__icontains=query) |
        models.Q(Player_2__name__icontains=query)
    )

    serialized_matches = MatchfullSerializer(matches, many=True).data
    grouped_matches = {}
    for match_data in serialized_matches:
        league_id = match_data['League']['name']
        if league_id not in grouped_matches:
            grouped_matches[league_id] = {'league_name': match_data['League']['name'], 'matches': []}
        grouped_matches[league_id]['matches'].append(match_data)

    return Response(grouped_matches)
   