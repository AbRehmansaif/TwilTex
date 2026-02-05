import os
import django
import sys

# Add the project directory to sys.path
sys.path.append(r'd:\Products\TwilTex')

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'twiltex.settings')
django.setup()

from django.contrib.auth.models import User
from blogs.models import Blog

def create_sample_blogs():
    # Create or get an admin user
    user, created = User.objects.get_or_create(username='admin')
    if created:
        user.set_password('admin123')
        user.is_staff = True
        user.is_superuser = True
        user.save()
        print("Admin user created.")

    if Blog.objects.count() < 15:
        for i in range(1, 16):
            Blog.objects.get_or_create(
                title=f"Sample Blog Post {i}",
                content=f"This is the content for sample blog post {i}. It contains some text to describe the post and test the pagination functionality of the new blog page. Twil Tex is dedicated to providing high-quality textiles and insights into the industry. This is post number {i}.",
                author=user
            )
        print("Sample blogs created.")
    else:
        print("Blogs already exist.")

if __name__ == "__main__":
    create_sample_blogs()
