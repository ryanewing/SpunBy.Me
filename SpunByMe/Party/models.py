from django.db import models
import datetime
# Create your models here.

class Party(models.Model):
  party_name = models.CharField(max_length=50)
  created_at = models.DateTimeField(auto_now_add=True, blank=False)
  
  @property
  def expired(self):
    return datetime.datetime.now() >= self.created_at+datetime.timedelta(24)


class Playlist(models.Model):
#  songs = models.
  pass
  