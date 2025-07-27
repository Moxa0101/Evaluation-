import java.util.*;
public class P18{
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        System.out.println("Enter n= ");
        int n=sc.nextInt();
        int num=1;
        for(int i = 1 ;i<=n ;i++){
            long[] row= new long[i];
            for(int j=0; j < i; j++){
                row[j]= num++;
            }
            for(int j=i-1;j>=0;j--){ //reverse
            System.out.print(row[j]);
            }
            System.out.println();
        }
    }
}