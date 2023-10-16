from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Note
from .serializers import NoteSerializer

@api_view(['GET']) #with decorators we are saying view that it is using rest_framework..and we can control the type of requests of the view
def getRoutes(request):

    return Response('Our Api')

@api_view(['GET'])
def getNotes(request):
    notes = Note.objects.all() # notes is python objects.we need to convert it to json
    Serializer = NoteSerializer(notes,many=True)#serialize many objects
    return Response(Serializer.data)

@api_view(['GET'])
def getNote(request,pk):
    notes = Note.objects.get(id=pk)
    Serializer = NoteSerializer(notes,many=False)#serialize one single object
    return Response(Serializer.data)

@api_view(['POST'])
def createNote(request):
    data = request.data
    note = Note.objects.create(
        body=data['body']
    )
    seriazer =  NoteSerializer(note, many=False)
    return Response()

@api_view(['PUT']) # post-creating, put-updating
def updateNote(request,pk):
    data = request.data
    note = Note.objects.get(id=pk)
    serializer = NoteSerializer(instance = note,data = data)

    if serializer.is_valid():
        serializer.save()

    return Response()

@api_view(['DELETE'])
def deleteNote(request,pk):
    note = Note.objects.get(id=pk)
    note.delete()
    return Response("Note is deleted")