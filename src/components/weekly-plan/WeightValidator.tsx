
export interface ValidationResult {
  isValid: boolean;
  message: string;
  type: 'success' | 'warning' | 'error';
}

export class WeightValidator {
  static validateWeightInput(weight: number, targetWeight: number, weekNumber: number): ValidationResult {
    // Temel validasyonlar
    if (isNaN(weight) || weight < 30 || weight > 300) {
      return {
        isValid: false,
        message: 'Geçersiz kilo değeri. 30-300 kg arasında olmalıdır.',
        type: 'error'
      };
    }

    // Aşırı değişim kontrolü
    const changeFromTarget = Math.abs(weight - targetWeight);
    if (changeFromTarget > 3) {
      return {
        isValid: false,
        message: `Hedeften ${changeFromTarget.toFixed(1)} kg sapma var. Kontrol ediniz.`,
        type: 'warning'
      };
    }

    // Başarı mesajları
    const tolerance = 0.5;
    if (Math.abs(weight - targetWeight) <= tolerance) {
      return {
        isValid: true,
        message: 'Mükemmel! Hedefin tam üzerinde.',
        type: 'success'
      };
    }

    // Hedeften sapma durumu
    if (weight < targetWeight) {
      return {
        isValid: true,
        message: 'Hedefinizin altında, harika ilerleme!',
        type: 'success'
      };
    } else {
      return {
        isValid: true,
        message: 'Hedefin üzerinde, sorun değil devam edin.',
        type: 'warning'
      };
    }
  }

  static validateWeeklyChange(currentWeight: number, previousWeight: number): ValidationResult {
    const weeklyChange = Math.abs(currentWeight - previousWeight);
    
    if (weeklyChange > 3) {
      return {
        isValid: false,
        message: `Haftalık ${weeklyChange.toFixed(1)} kg değişim çok fazla. Kontrol ediniz.`,
        type: 'error'
      };
    }

    if (weeklyChange > 1.5) {
      return {
        isValid: true,
        message: `Haftalık ${weeklyChange.toFixed(1)} kg değişim biraz hızlı, dikkatli olun.`,
        type: 'warning'
      };
    }

    return {
      isValid: true,
      message: 'Sağlıklı haftalık değişim.',
      type: 'success'
    };
  }
}
