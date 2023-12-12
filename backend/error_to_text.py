def merge_db_files():
    file1_path = 'lids_backend_error_log.db'
    file2_path = 'lids_main_error_log.db'
    output_file_path = 'CS4311_LIDS_4CodOfDuty_Fall2023\src\Components\errors.txt'
    try:
        # Open the first database file and read its content
        with open(file1_path, 'r', encoding='utf-8') as file1:
            content_file1 = file1.readlines()

        # Open the second database file and read its content
        with open(file2_path, 'r', encoding='utf-8') as file2:
            content_file2 = file2.readlines()

        # Combine the content from both files
        merged_content = content_file1 + content_file2

        # Write the merged content to the output text file
        with open(output_file_path, 'w', encoding='utf-8') as output_file:
            output_file.writelines(merged_content)

        print(f"Merged content from {file1_path} and {file2_path} into {output_file_path}")
    except Exception as e:
        print(f"Error merging files: {e}")

# Example usage:
merge_db_files()
