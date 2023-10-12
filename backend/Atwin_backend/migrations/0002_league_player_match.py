# Generated by Django 4.2.6 on 2023-10-10 17:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Atwin_backend', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='League',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=40)),
            ],
        ),
        migrations.CreateModel(
            name='Player',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=40)),
                ('coutnry', models.CharField(max_length=2)),
            ],
        ),
        migrations.CreateModel(
            name='Match',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=40)),
                ('Winner', models.CharField(max_length=1)),
                ('Status', models.CharField(max_length=10)),
                ('Score', models.JSONField()),
                ('League', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Atwin_backend.league')),
                ('Player_1', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Player_1', to='Atwin_backend.player')),
                ('Player_2', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Player_2', to='Atwin_backend.player')),
            ],
        ),
    ]
