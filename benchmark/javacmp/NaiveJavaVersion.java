import java.util.*;

// this is not precise microbenchmarking, we just want a ballpark idea
public class NaiveJavaVersion {
    // very fast semi-random function
    static int rand(int i) {
        i = i + 10000;
        i = i ^ (i << 16);
        i = (i >> 5) ^ i ;
        return i & 0xFF;
    }

    static PriorityQueue<Integer> QueueEnqueueBench() {
        PriorityQueue<Integer> pq = new PriorityQueue<Integer>() ;
        for(int i = 0; i < 128; i++ ) {
            pq.add(rand(i));
        }
        for(int i = 0; i < 128 * 10; i++ ) {
            pq.add(i);
            pq.poll();
        }
        return pq;
    }

    public static void main(String[] args) {
        for(int k = 0; k <1000; ++k) {
            QueueEnqueueBench();
            if(k%10 == 0) System.gc();
        }
        for(int z = 0; z < 5; ++z) {
            System.gc();
            ArrayList<PriorityQueue<Integer> > buffer = new ArrayList<PriorityQueue<Integer> >(1000);
            long bef = System.nanoTime();
            for(int k = 0; k <1000; ++k) {
                buffer.add(QueueEnqueueBench());
            }
            long aft = System.nanoTime();
            System.out.println(1000* 1000 * 1000 * 1000.0/(aft-bef)+" ops/sec ");
        }

    }

}
