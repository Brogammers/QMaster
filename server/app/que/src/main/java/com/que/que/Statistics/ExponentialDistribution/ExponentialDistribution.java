package com.que.que.Statistics.ExponentialDistribution;

public class ExponentialDistribution {

    public static double probabilityDensityFunction(double x, double lambda) {
        if (x < 0) {
            return 0;
        }
        return lambda * Math.exp(-lambda * x);
    }

    public static double cumulativeDistributionFunction(double x, double lambda) {
        if (x < 0) {
            return 0;
        }
        return 1 - Math.exp(-lambda * x);
    }

    public static double mean(double lambda) {
        return 1 / lambda;
    }

    public static double variance(double lambda) {
        return 1 / (lambda * lambda);
    }
}
