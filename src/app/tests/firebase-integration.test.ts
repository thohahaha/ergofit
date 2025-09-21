// Firebase Integration Test
// This file can be used to test Firebase connectivity

import { FirebaseService } from '../services/firebase.service';
import { ErgoFitDataService } from '../services/ergofit-data.service';

// Simple test function to verify Firebase is working
export async function testFirebaseIntegration() {
  console.log('🔥 Testing Firebase Integration...');
  
  try {
    // Test Firebase service initialization
    const firebaseService = new FirebaseService();
    console.log('✅ Firebase Service initialized successfully');
    
    // Test analytics logging
    firebaseService.logPageView('test_page');
    console.log('✅ Analytics logging test successful');
    
    // Test custom event logging
    firebaseService.logPostureEvent('test_event', {
      test_parameter: 'test_value',
      timestamp: new Date().toISOString()
    });
    console.log('✅ Custom event logging test successful');
    
    console.log('🎉 All Firebase tests passed!');
    return true;
    
  } catch (error) {
    console.error('❌ Firebase test failed:', error);
    return false;
  }
}

// Function to test the ErgoFit data service
export async function testErgoFitDataService() {
  console.log('🏋️ Testing ErgoFit Data Service...');
  
  try {
    const dataService = new ErgoFitDataService(new FirebaseService());
    
    // Test saving posture data
    await dataService.savePostureReading({
      neckScore: 8,
      backScore: 7,
      shoulderScore: 9,
      hipScore: 8,
      overallScore: 80
    });
    console.log('✅ Posture data saving test successful');
    
    // Test logging exercise activity
    await dataService.logExerciseActivity('neck_stretch', 60);
    console.log('✅ Exercise activity logging test successful');
    
    console.log('🎉 All ErgoFit Data Service tests passed!');
    return true;
    
  } catch (error) {
    console.error('❌ ErgoFit Data Service test failed:', error);
    return false;
  }
}

// Combined test function
export async function runAllTests() {
  console.log('🚀 Running all Firebase integration tests...');
  
  const firebaseTest = await testFirebaseIntegration();
  const dataServiceTest = await testErgoFitDataService();
  
  if (firebaseTest && dataServiceTest) {
    console.log('🎊 All tests passed! Firebase is properly integrated.');
  } else {
    console.log('⚠️ Some tests failed. Please check the configuration.');
  }
  
  return firebaseTest && dataServiceTest;
}