package com.que.que.Statistics;

public class MathService {
    public static long factorial(int x) {
        if (x == 0) {
            return 1;
        }
        long result = 1;
        for (int i = 1; i <= x; i++) {
            result *= i;
        }
        return result;
    }
}
