package com.que.que.Statistics.Poisson;

import com.que.que.Statistics.MathService;

public class QueuePoissonDistribution {

    public static double calculateProbability(double lambda, int k) {
        return (Math.pow(lambda, k) * Math.exp(-lambda)) / MathService.factorial(k);
    }

}
