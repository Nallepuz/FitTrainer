export interface Workout {
    id: number;
    title: string;
    description: string;
    duration: string;
    level: string;
  }
  
  export interface WorkoutExercise {
    id: number;
    workoutId: number;
    exerciseId: number;
    sets: number;
    reps: number;
    weight: number;
  }