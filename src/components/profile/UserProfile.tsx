
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, Camera, Save, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserProfileData {
  name: string;
  age: string;
  gender: string;
  height: string;
  goalType: string;
  activityLevel: string;
  profilePhoto: string;
}

interface UserProfileProps {
  onSave: (data: UserProfileData) => void;
  onClose: () => void;
}

export const UserProfile = ({ onSave, onClose }: UserProfileProps) => {
  const [profileData, setProfileData] = useState<UserProfileData>(() => {
    const saved = localStorage.getItem('kiloTakipProfile');
    return saved ? JSON.parse(saved) : {
      name: '',
      age: '',
      gender: '',
      height: '',
      goalType: '',
      activityLevel: '',
      profilePhoto: ''
    };
  });
  
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfileData(prev => ({ ...prev, profilePhoto: result }));
        setIsUploading(false);
        toast({
          title: "Fotoğraf Yüklendi! 📸",
          description: "Profil fotoğrafınız başarıyla güncellendi.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem('kiloTakipProfile', JSON.stringify(profileData));
    onSave(profileData);
    toast({
      title: "Profil Kaydedildi! ✅",
      description: "Profil bilgileriniz başarıyla güncellendi.",
    });
  };

  const getGoalTypeColor = (type: string) => {
    switch (type) {
      case 'weightLoss': return 'bg-red-100 text-red-800';
      case 'weightGain': return 'bg-green-100 text-green-800';
      case 'maintain': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityLevelColor = (level: string) => {
    switch (level) {
      case 'sedentary': return 'bg-red-100 text-red-800';
      case 'light': return 'bg-yellow-100 text-yellow-800';
      case 'moderate': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'veryActive': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            <User className="h-6 w-6 text-blue-600" />
            <span>Kullanıcı Profili</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Profile Photo */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profileData.profilePhoto} />
                <AvatarFallback className="text-2xl">
                  {profileData.name ? profileData.name.charAt(0).toUpperCase() : '👤'}
                </AvatarFallback>
              </Avatar>
              <label className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors">
                <Camera className="h-4 w-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
            </div>
            {isUploading && <p className="text-sm text-gray-500">Fotoğraf yükleniyor...</p>}
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">İsim</Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Adınız"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age">Yaş (Opsiyonel)</Label>
              <Input
                id="age"
                type="number"
                value={profileData.age}
                onChange={(e) => setProfileData(prev => ({ ...prev, age: e.target.value }))}
                placeholder="25"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gender">Cinsiyet (Opsiyonel)</Label>
              <Select value={profileData.gender} onValueChange={(value) => setProfileData(prev => ({ ...prev, gender: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Seçiniz" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Erkek</SelectItem>
                  <SelectItem value="female">Kadın</SelectItem>
                  <SelectItem value="other">Diğer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="height">Boy (cm) (Opsiyonel)</Label>
              <Input
                id="height"
                type="number"
                value={profileData.height}
                onChange={(e) => setProfileData(prev => ({ ...prev, height: e.target.value }))}
                placeholder="175"
              />
            </div>
          </div>

          {/* Goal Type */}
          <div className="space-y-2">
            <Label>Hedef Türü</Label>
            <Select value={profileData.goalType} onValueChange={(value) => setProfileData(prev => ({ ...prev, goalType: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Hedef türünüzü seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weightLoss">Kilo Kaybı</SelectItem>
                <SelectItem value="weightGain">Kilo Artışı</SelectItem>
                <SelectItem value="maintain">Kilo Koruma</SelectItem>
              </SelectContent>
            </Select>
            {profileData.goalType && (
              <Badge className={getGoalTypeColor(profileData.goalType)}>
                <Target className="h-3 w-3 mr-1" />
                {profileData.goalType === 'weightLoss' ? 'Kilo Kaybı' : 
                 profileData.goalType === 'weightGain' ? 'Kilo Artışı' : 'Kilo Koruma'}
              </Badge>
            )}
          </div>

          {/* Activity Level */}
          <div className="space-y-2">
            <Label>Aktivite Seviyesi</Label>
            <Select value={profileData.activityLevel} onValueChange={(value) => setProfileData(prev => ({ ...prev, activityLevel: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Aktivite seviyenizi seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Hareketsiz (Masa başı iş)</SelectItem>
                <SelectItem value="light">Hafif Aktif (Haftada 1-3 gün)</SelectItem>
                <SelectItem value="moderate">Orta Aktif (Haftada 3-5 gün)</SelectItem>
                <SelectItem value="active">Aktif (Haftada 6-7 gün)</SelectItem>
                <SelectItem value="veryActive">Çok Aktif (Günde 2 kez)</SelectItem>
              </SelectContent>
            </Select>
            {profileData.activityLevel && (
              <Badge className={getActivityLevelColor(profileData.activityLevel)}>
                {profileData.activityLevel === 'sedentary' ? 'Hareketsiz' :
                 profileData.activityLevel === 'light' ? 'Hafif Aktif' :
                 profileData.activityLevel === 'moderate' ? 'Orta Aktif' :
                 profileData.activityLevel === 'active' ? 'Aktif' : 'Çok Aktif'}
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              İptal
            </Button>
            <Button onClick={handleSave} className="flex items-center space-x-2">
              <Save className="h-4 w-4" />
              <span>Kaydet</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
