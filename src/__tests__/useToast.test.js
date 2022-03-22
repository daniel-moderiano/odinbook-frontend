import { renderHook, act } from '@testing-library/react-hooks';
import { useToast } from '../hooks/useToast'

// Set timeout for the entire test to avoid timeout error
jest.setTimeout(10000);

// Avoid logging errors
beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

describe('Setting toast parameters', () => {
  it('sets default toast params when none are provided as explicit params', () => {
    const { result } = renderHook(() => useToast());
  
    act(() => {
      // Typically params will be provided here
      result.current.showToast();
    })
  
    expect(result.current.toastParams.type).toBe('error');
    expect(result.current.toastParams.message).toBe('');
  });
  
  it('sets toast params according to provided params', () => {
    const { result } = renderHook(() => useToast());
  
    act(() => {
      result.current.showToast('success', 'Test message');
    })
  
    expect(result.current.toastParams.type).toBe('success');
    expect(result.current.toastParams.message).toBe('Test message');
  });
})

describe('Setting toast visiblity', () => {
  it('sets toastVisible to true on calling showToast func', () => {
    const { result } = renderHook(() => useToast());
  
    // Call a function that is exported by the hook
    act(() => {
      result.current.showToast();
    })
  
    // This should be true when evaluated synchronously 
    expect(result.current.toastVisible).toBe(true);
  });
    
  it('sets toastVisible to false after the set duration (set within hook, currently 2000 ms)', async () => {
    const { result } = renderHook(() => useToast());
  
    // This setup essentially pauses the test for 5 seconds within the act function. This is required to wait for the toastVisible change, and because Jest will error if you try and pause outside the act function scope
    await act( async () => {
      result.current.showToast();
      await new Promise(res => setTimeout(res, 5000));
    })
  
    expect(result.current.toastVisible).toBe(false);
  });
})
