import java.util.*;

public class P27 {
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        System.out.print("enter no.of rows: ");
        int n = sc.nextInt();

        System.out.print("enter no.of triangles: ");
        int t = sc.nextInt();
        for (int i = 0; i < n; i++) {
            for (int a = 0; a < n - i; a++) {
                System.out.print(" ");
            }
            if (i == 0) {
                for (int j = 0; j < t; j++) {
                    System.out.print("*");
                    for (int k = 0; k <= 2 * (n - 1) - 1; k++) {
                        System.out.print(" ");
                    }
                }
            }

            else if (i > 0 && i < n - 1) {
                for (int j = 0; j < 2 * t; j++) {
                    System.out.print("*");
                    if (j % 2 == 0) {
                        for (int k = 0; k < 2 * i - 1; k++) {
                            System.out.print(" ");
                        }
                    } else {
                        int m = (2 * (n - 2) + 1);

                        for (int l = m; l > 2 * i - 1; l--) {

                            System.out.print(" ");
                        }

                    }
                }
            }

            else if (i == n - 1) {
                for (int j = 0; j < t + 1; j++) {
                    System.out.print("*");
                    for (int k = 0; k <= 2 * (n - 1) - 1; k++) {
                        System.out.print(" ");
                    }
                }
            }
            System.out.println();

        }
    }
}