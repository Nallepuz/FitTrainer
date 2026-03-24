export interface Workout {
    id: number;
    title: string;
    date: string;
    notes: string;
    userId: number;
  }
  
  export interface WorkoutExercise {
    id: number;
    workoutId: number;
    exerciseId: number;
    sets: number;
    reps: number;
    weight: number;
  }