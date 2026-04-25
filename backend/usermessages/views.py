from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from .models import UserMessage
from .serializers import UserMessageSerializer


@api_view(['POST'])
def send_message(request):
    serializer = UserMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Message sent successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_all_messages(request):
    messages = UserMessage.objects.all().order_by('-created_at')
    serializer = UserMessageSerializer(messages, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_message(request, pk):
    try:
        message = UserMessage.objects.get(pk=pk)
    except UserMessage.DoesNotExist:
        return Response({'error': 'Message not found'}, status=status.HTTP_404_NOT_FOUND)

    message.is_read = True
    message.save()
    serializer = UserMessageSerializer(message)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_message(request, pk):
    try:
        message = UserMessage.objects.get(pk=pk)
    except UserMessage.DoesNotExist:
        return Response({'error': 'Message not found'}, status=status.HTTP_404_NOT_FOUND)

    message.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)