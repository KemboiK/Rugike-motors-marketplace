from django.shortcuts import render
from rest_framework import viewsets
from .models import Customer
from .serializers import CustomerSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from django.http import HttpResponse
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

@api_view(['GET'])
@permission_classes([IsAdminUser])
def download_customer_list_pdf(request):
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="customer_list.pdf"'

    doc = SimpleDocTemplate(response, pagesize=letter)
    styles = getSampleStyleSheet()
    elements = []

    elements.append(Paragraph("Customer List", styles['Title']))
    elements.append(Spacer(1, 12))

    # Table header
    data = [['ID', 'Name', 'Email', 'Phone', 'Status', 'Join Date']]

    customers = Customer.objects.all().order_by('name')
    for customer in customers:
        status = "Active" if customer.is_active else "Inactive"
        joined = customer.joined_at.strftime("%Y-%m-%d")
        phone = customer.phone if customer.phone else '-'

        data.append([
            str(customer.id),
            customer.name,
            customer.email,
            phone,
            status,
            joined
        ])

    table = Table(data, colWidths=[40, 120, 150, 90, 60, 80])
    style = TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#d5dae6')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.black),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('GRID', (0, 0), (-1, -1), 0.8, colors.grey),
        ('ROWBACKGROUNDS', (1, 0), (-1, -1), [colors.white, colors.HexColor('#f0f0f0')]),
    ])
    table.setStyle(style)
    elements.append(table)

    doc.build(elements)
    return response