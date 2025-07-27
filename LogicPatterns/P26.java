import java.util.*;
public class P26 {
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
        for(int i=0;i<3;i++){
            P26.Print_star(n,n-1-i,i);
        }
    }
    
}

// it will print 3 row  and n numbers of left slanding lines i.e.  n=4
//    *   *   *   *
//   *   *   *   *
//  *   *   *   *