package com.fhsfa.cxs;

import com.fhsfa.cxs.services.ManifestacaoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class CxsApplicationTests {
	@Autowired
	private ManifestacaoService service;
	@Test
	void contextLoads() {
		service.nextBusinessDay("2022-04-14", 2);
	}

}
