from django.db import models
from datetime import datetime
class Blog(models.Model):

    title = models.CharField(max_length=255)
    headline = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    body = models.TextField(null=True, blank=True)
    thumbnail = models.ImageField(null=True, blank=True, upload_to="blog-thumbnails")

    category = models.ForeignKey("service.Category", on_delete=models.CASCADE)
    tags = models.ManyToManyField("service.Tag",blank=True)
    #------------------------------------------------------------------------------------
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    published = models.DateTimeField(null=True,blank=True)
    #------------------------------------------------------------------------------------
    views = models.PositiveIntegerField(default=0, blank=True)
    pin_to_top = models.BooleanField(default=False)
    #------------------------------------------------------------------------------------
    STATUS_CHOICE = (
        ("published", "Published"),
        ("scheduled", "Scheduled"),
        ("draft", "Draft"),
        ("deleted", "Deleted"),
    )
    status = models.CharField(choices=STATUS_CHOICE,default="draft", max_length=20, null=True, blank=True)
    #------------------------------------------------------------------------------------
    comments = models.ManyToManyField("service.Comment", blank=True)

    class Meta:
        verbose_name = "blog"
        ordering = ["-published","-updated","-created"]

    #----------------------------------------------------------------------------------
    def delete_blog(self):
        self.status = "deleted"
        self.save()
    def toggle_publish(self):
        if self.status == "published":
            self.unpublish_blog()
        else:
            self.publish_blog()
    def publish_blog(self):
        self.published = datetime.now()
        self.status = "published"
        self.save()

    def unpublish_blog(self):
        self.status = "draft"
        self.save()

    #----------------------------------------------------------------------------------

    # def natural_key(self):
    #     return {
    #         "author":self.author.get_full_name(),
    #         "title":self.title,
    #     }

    def __str__(self):
        return f"{self.title}"


