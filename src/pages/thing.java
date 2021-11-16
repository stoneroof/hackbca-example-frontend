public class Calculator {
    // Ask the user for two numbers and add them.
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter a number: ");
        int num1 = scanner.nextInt();
        System.out.println("Enter another number: ");
        int num2 = scanner.nextInt();
        System.out.println("The sum of " + num1 + " and " + num2 + " is " + (num1 + num2));
    }

    void thing() {
        System.out.println("Hello world");
    }
}