package com.que.que.Statistics;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.anyDouble;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Timeout;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class QueuePoissonDistributionTest {

    @Mock
    private QueuePoissonDistribution queuePoissonDistribution;

    @BeforeEach
    public void setUp() {
        // Create an instance of the class under test
        queuePoissonDistribution = Mockito.mock(QueuePoissonDistribution.class);
    }

    @Test
    @Timeout(5000)
    public void testFunctionCallCount() {
        // Mocking the fac method
        when(queuePoissonDistribution.factorial(anyInt())).thenCallRealMethod();

        queuePoissonDistribution.factorial(7);

        // Verify that the method was called exactly once
        Mockito.verify(queuePoissonDistribution,
                Mockito.atMost(2)).factorial(anyInt());

        // Testing code fucntionality
        when(queuePoissonDistribution.factorial(anyInt())).thenReturn(120);
        when(queuePoissonDistribution.calculateProbability(anyDouble(),
                anyInt())).thenCallRealMethod();

        double probability = queuePoissonDistribution.calculateProbability(4, 5);

        assertEquals(0.1562934519, probability, 0.0000001);

        when(queuePoissonDistribution.factorial(anyInt())).thenCallRealMethod();

        probability = queuePoissonDistribution.calculateProbability(45, 35);

        assertEquals(0.02018150957, probability, 0.0000001);

    }

}