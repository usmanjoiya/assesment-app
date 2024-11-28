Readme file for `TechnicalAssesment`_
====================================

Getting Started

Installation
------------

Prerequisites

Ensure you have the following installed on your machine:

Python: Python 3.11+ (Check installed version using: python --version or python3 --version)
Pip: Comes with Python 3. Ensure it is updated:
.. code-block:: bash
    python -m pip install --upgrade pip

1.Create a Virtual Environment
------------
.. code-block:: bash
    python -m venv venv
    venv\Scripts\activate

2.Install Required Packages
------------
.. code-block:: bash
    pip install -r requirements.txt


3.Set Up the Database
------------
.. code-block:: bash
    python manage.py makemigrations
    python manage.py migrate

4.Create a Superuser
.. code-block:: bash
    python manage.py createsuperuser

5.Run the Development Server
.. code-block:: bash
    python manage.py runserver


Access the application at http://127.0.0.1:8000.
Access the AdminPannel at http://127.0.0.1:8000/admin.

