CREATE OR REPLACE FUNCTION set_product_status()
    RETURNS TRIGGER LANGUAGE plpgsql AS
    $$ BEGIN
    IF NEW.quantity > 20 THEN
        NEW.status = 'IN_STOCK';
RETURN NEW;
END IF;
    IF NEW.quantity <= 20 THEN
        NEW.status = 'RUNNING_LOW';
RETURN NEW;
END IF;
    IF NEW.quantity = 0 THEN
        NEW.status = 'OUT_OF_STOCK';
RETURN NEW;
END IF;
RETURN NULL;
END;
    $$;

CREATE TRIGGER status_change
    BEFORE UPDATE OR INSERT
    ON "Product"
    FOR EACH ROW
EXECUTE FUNCTION set_product_status();