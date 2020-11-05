from django.contrib import admin
from .models import Reviews

class ReviewsAdmin(admin.ModelAdmin):  
      list_display = ('title', 'description','image','content_rating','readability_rating','update_at','comprehensibility_rating','completed') 

# Register your models here.
admin.site.register(Reviews, ReviewsAdmin)