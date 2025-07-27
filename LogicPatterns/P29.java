
// import java.util.*;

// public class P29 {
//     public static void main(String args[]) {
//         Scanner sc = new Scanner(System.in);
//         System.out.print("enter n: ");
//         int n = sc.nextInt();
//         for (int i = 1; i <= n; i++) {

//             if (i == 1) {
//                 for (int j = 1; j <= (n * (n + 1)/2; j++) {
//                     System.out.print(" ");
//                 }
//                 System.out.print(" * ");
//             } else if (i == n) {
//                 for (int j = 1; j <= (i * (i + 1)) / 2; j++) {
//                     System.out.print("* ");
//                 }
//             } else if (i > 1 && i < n) {

//                 for (int j = 1; j <= (i * (i + 1)) / 2; j++) {

//                     System.out.print("* ");
//                 }
//             }
//             System.out.println();
//         }
//         for (int i = n - 1; i >= 1; i--) {
//             if (i == 1) {
//                 for (int j = 1; j <= n * (n - 1)+2; j++) {
//                     System.out.print(" ");
//                 }
//                 System.out.print("* ");
//             }

//             else if (i > 1 && i < n) {
//                 for (int j = 1; j <= (i * (i + 1)) / 2; j++) {

//                     System.out.print("* ");
//                 }
//             }
//             System.out.println();
//         }

//     }
// }
import java.util.*;

public class P29 {
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        System.out.print("enter n: ");
        int n = sc.nextInt();
        for (int i = 1; i <= n; i++) {

                for (int k = 1; k <= n - i; k++) {
                    System.out.print(" ");
                }

                for (int j = 1; j <= (i * (i + 1)) / 2; j++) {
                    System.out.print("* ");
                
               
            if (i == j) {
                for (int k = 1; k <= n - i; k++) {
                    for (int m = k; m >= k-1; m--) {
                        System.out.print(" ");
                    }
                }
            } else if (j == (2 * i) - 1) {
                for (int k = 0; k < n - i; k++) {
                    for (int m = k; m >= k-1; m--) {
                        System.out.print(" ");
                    }
                }

            }
        
             if(j==(3*i)-3){
                for (int k = 0; k < n - i; k++) {
                    for (int m = k; m >= k-1; m--) {
                        System.out.print(" ");
                    }
                }
            }
            
               if(j==(3*i)-1){
                 for (int k = 0; k < n - i; k++) {
                    for (int m = k; m >= k-1; m--) {
                        System.out.print(" ");
                    }
                }
            }
            
        }
        System.out.println();

    }

        for (int i = n - 1; i >= 1; i--) {

            for (int k = 1; k <= n - i; k++) {
                System.out.print(" ");
            }

            for (int j = 1; j <= (i * (i + 1)) / 2; j++) {
                System.out.print("* ");
                if (i == j) {
                for (int k = 1; k <= n - i; k++) {
                    for (int m = k; m >= k-1; m--) {
                        System.out.print(" ");
                    }
                }
            } else if (j == (2 * i) - 1) {
                for (int k = 0; k < n - i; k++) {
                    for (int m = k; m >= k-1; m--) {
                        System.out.print(" ");
                    }
                }

            }
           if(j==(3*i)-3){
                for (int k = 0; k < n - i; k++) {
                    for (int m = k; m >= k-1; m--) {
                        System.out.print(" ");
                    }
                }
            }
               
               if(j==(3*i)-1){
                 for (int k = 0; k < n - i; k++) {
                    for (int m = k; m >= k-1; m--) {
                        System.out.print(" ");
                    }
                }
            }

            }

            System.out.println();
        }

    }
}
// for(int k=1;k<=((i*i)-(i-2))/2;k++){
// System.out.print(" ");
// System.out.print("* ");}

// for(int j=1;j<=i;j++){
