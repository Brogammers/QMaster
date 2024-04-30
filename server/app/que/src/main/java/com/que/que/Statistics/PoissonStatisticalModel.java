package com.que.que.Statistics;

public abstract class PoissonStatisticalModel {

    /**
     * Method to calculate the probability of a user joining the queue.
     * 
     * @param lambda The average number of users joining the queue per unit time.
     * @param k      The number of users joining the queue.
     * @return The probability of k users joining the queue.
     */
    public abstract double calculateProbability(double lambda, int k);

    /**
     * Calculates the factorial of a given integer.
     *
     * @param x the integer for which the factorial is to be calculated
     * @return the factorial of the given integer
     */
    // Note: This method should not be implemented recursively
    public abstract int factorial(int x);
}
