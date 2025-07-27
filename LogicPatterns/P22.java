import java.util.*;
public class P22{
    public static void main(String[] args) {
        // String s=new String("A");
        char ch = 'A';
        char temp=ch;
        for(int i=1;i<=5;i++){
            for(int j=1;j<=i;j++){
                System.out.print(temp);
                temp+=2;
            }
        
            System.out.println();
        }
    }
}