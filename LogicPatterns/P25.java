import java.util.*;
public class P25 {
    //sc=star count    sb=space before   sa=space after
    public static int Print_star(int sc,int sb,int sa){
        for(int i=0;i<sc;i++){
            for(int j=0;j<sb;j++){
                System.out.print(" ");
            }
            System.out.print("*");
            for(int k=0;k<sa;k++){
                System.out.print(" ");
            }
        }
        System.out.println();
        return 0;
    }

    public static void main(String args[]){
        Scanner sc=new Scanner(System.in);
        System.out.print("enter n: ");
        int n=sc.nextInt();
        for(int j=1;j<=n;j++){
        //while(n>0){
        for(int i=1;i<=j;i++){
            P25.Print_star(j,n-i,i);
        }
        //n--;
    }
    }
    
    
}
//this prints 4 row and 16 columns for n=4 and for n=3 it will print 3 rows 9 columns
//     *    *    *    *
//    *    *    *    *
//   *    *    *    *
//  *    *    *    *

